import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

//conditional styling of button based on values passed to it
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

//uses forwardRef to forward the ref to the underlying button element (or Slot if asChild is true).
/* 
    forwardRef use case: imagine you have a parent component that needs to focus on the button when some event happens, 
    with forwardRef you pass the ref to the Button component and the parent can access the button element directly

  e.g.
  const ParentComponent = () => {
  const buttonRef = React.useRef(null);

  const handleClick = () => {
    // Focus on the button when this function is called
    buttonRef.current?.focus();
  };

  return (
    <>
      <Button ref={buttonRef}>Click Me</Button>
      <button onClick={handleClick}>Focus the Button</button>
    </>
  );
};

*/

// HTMLButtonElement is typeof ref that DOM element will point to, ButtonProps is the interface that defines the props that the Button will accept
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    //if as child true the Button component renders the Slot component which allows the button to be wrapped inside a custom component
    // if false defaults to rendering the standard button element
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        // cn is a classname combiner which combines strings to create a dynamic classname
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }