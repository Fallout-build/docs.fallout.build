using Fallout.Common;
using Fallout.Common.Tooling;
using Fallout.Common.Tools.Npm;
using static Fallout.Common.Tools.Npm.NpmTasks;

/// <summary>
/// Builds the Docusaurus site for docs.fallout.build using Fallout itself.
///
///   dotnet run --project _build/_build.csproj -- BuildSite
///
/// The actual markdown lives in Fallout-build/Fallout (docs/); CI checks it out
/// into ./fallout-source before this runs. This build just drives npm via
/// Fallout's Npm tool wrapper — small on purpose, the point is to dogfood.
/// </summary>
class Build : FalloutBuild
{
    public static int Main() => Execute<Build>(x => x.BuildSite);

    Target Restore => _ => _
        .Executes(() => NpmCi(s => s
            .SetProcessWorkingDirectory(RootDirectory)));

    Target BuildSite => _ => _
        .DependsOn(Restore)
        .Executes(() => NpmRun(s => s
            .SetCommand("build")
            .SetProcessWorkingDirectory(RootDirectory)));
}
