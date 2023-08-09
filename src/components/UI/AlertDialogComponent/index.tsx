import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/UI/AlertDialog';
// import { Button } from '@/components/UI/ShadcnButton';

interface Props {
  children: React.ReactNode;
  action: (() => void) | ((event: React.FormEvent) => Promise<void>);
  actionClassName?: string;
  alertDescription?: string;
}

export default function AlertDialogComponent({
  children,
  action,
  actionClassName,
  alertDescription = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button className="bg-persimmon" variant="outline">Show Dialog</Button> */}
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={actionClassName} onClick={action}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
