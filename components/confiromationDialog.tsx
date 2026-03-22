type ConfirmationDialogProps = {
  onConfirm: () => void;
  message: string;
  // Change type to match Solid's ref-forwarding (element or callback)
  ref?: HTMLDialogElement | ((el: HTMLDialogElement) => void);
};

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  let dialogRef: HTMLDialogElement;

  return (
    <dialog
      ref={(el) => {
        dialogRef = el;
        if (typeof props.ref === "function") props.ref(el);
        else if (props.ref) (props as any).ref = el;
      }}
      class="m-auto bg-surface text-text p-4 rounded-2xl"
    >
      <p>{props.message}</p>
      <div class="flex flex-row gap-4 justify-center mt-4">
        <button
          class="border p-4 pt-2 pb-2 rounded-xl"
          onClick={() => dialogRef.close()}
        >
          No
        </button>
        <button
          class="bg-primary text-primary-foreground p-4 pt-2 pb-2 rounded-xl"
          onClick={() => {
            dialogRef.close();
            props.onConfirm();
          }}
        >
          Yes
        </button>
      </div>
    </dialog>
  );
}
