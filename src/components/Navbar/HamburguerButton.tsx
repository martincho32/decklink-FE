import { Hamburguer } from '../icons';

interface Props {
  onClickHamburguer: () => void;
}

function HamburguerButton({ onClickHamburguer }: Props) {
  return (
    <button
      type="button"
      onClick={onClickHamburguer}
      className="block md:hidden"
    >
      <Hamburguer />
    </button>
  );
}

export default HamburguerButton;
