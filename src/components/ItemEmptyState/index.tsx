import styles from './EmptyState.module.css';

type EmptyStateProps = {
  title: string;
  subtitle: string;
  button: React.ReactElement; // We can use React.ReactElement for the button prop to represent a JSX element
};

function EmptyState({ title, subtitle, button }: EmptyStateProps) {
  return (
    <div className={styles.noItemsWrapper}>
      <div className={styles.noItemsTextWrapper}>
        <h1 className={styles.noItemsTitle}>{title}</h1>
        <h2 className={styles.noItemsSubtitle}>{subtitle}</h2>
      </div>
      {button}
    </div>
  );
}

export default EmptyState;
