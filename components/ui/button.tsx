import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = 'outline',
  className,
}: Props) {
  const base =
    'rounded-full px-4 py-2 text-sm font-medium transition';

  const styles = {
    outline:
      'border border-[#0E23CB] text-[#0E23CB] hover:bg-[#0E23CB] hover:text-white',
    primary:
      'bg-[#0E23CB] text-white hover:opacity-90',
  };

  const combined = clsx(base, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combined}>
      {children}
    </button>
  );
}