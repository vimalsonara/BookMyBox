import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DialogWrapperProps = {
  trigger: string;
  heading: string;
  children: React.ReactNode;
};

export default function DialogWrapper({
  trigger,
  heading,
  children,
}: DialogWrapperProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
