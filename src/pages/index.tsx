import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function Trefoil({className}: {className?: string}): ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Radioactive trefoil">
      <g fill="currentColor">
        <circle cx="50" cy="50" r="10" />
        <path d="M28 11.91 A44 44 0 0 1 72 11.91 L58 36.14 A16 16 0 0 0 42 36.14 Z" />
        <path
          d="M28 11.91 A44 44 0 0 1 72 11.91 L58 36.14 A16 16 0 0 0 42 36.14 Z"
          transform="rotate(120 50 50)"
        />
        <path
          d="M28 11.91 A44 44 0 0 1 72 11.91 L58 36.14 A16 16 0 0 0 42 36.14 Z"
          transform="rotate(240 50 50)"
        />
      </g>
    </svg>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.inner)}>
        <Trefoil className={styles.mark} />
        <Heading as="h1" className={styles.title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <p className={styles.sub}>
          The hard-fork successor to NUKE — <b>build automation that survived
          the Nuke</b>.
        </p>
        <div className={styles.term}>
          <span className={styles.termPrompt}>$</span> dotnet fallout
          <span className={styles.cursor} />
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction">
            Read the docs ▸
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://github.com/Fallout-build/Fallout">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
    </Layout>
  );
}
