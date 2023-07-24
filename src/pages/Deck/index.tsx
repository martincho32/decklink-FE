import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/icons';
import { MainLayout, Button } from '../../components';

function Deckpage() {
  const navigate = useNavigate();
  const onClickGoBack = () => {
    navigate(-1);
  };

  const onClickCreate = () => {
    console.log('clicked create!!');
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-12 max-h-24 gap-7">
        <div className="flex justify-center md:justify-start gap-6">
          <Button
            icon={<Logo color="white" />}
            type="button"
            className="bg-persimmon -rotate-90 p-4"
            onClick={onClickGoBack}
          />
          <span className="self-center text-xl leading-normal">Go Back</span>
        </div>
        <h1 className="text-2xl leading-normal">Create new Deck</h1>
        <div className="flex gap-4 col-span-1 md:col-span-2 xl:col-span-1">
          <Button
            icon={<Logo color="white" />}
            type="button"
            className="bg-persimmon text-white py-4 px-5 grow"
            onClick={onClickCreate}
            text="Create"
          />
          <Button
            icon={<Logo />}
            type="button"
            borderColor="#F1511B"
            className="text-persimmon py-4 px-5 grow"
            onClick={onClickCreate}
            text="Save as a Draft"
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Deckpage;
