// // src/components/ui/toaster.tsx
// "use client";

// import React from "react";
// // import { useToast } from "@/hooks/use-toast";
// import {
//   Toast,
//   ToastClose,
//   ToastDescription,
//   ToastTitle,
//   ToastViewport,
// } from "@/components/ui/toast";

// export function Toaster() {
//   const { toasts } = useToast();

//   return (
//     <>
//       {toasts.map(({ id, title, description, variant, action, ...props }) => (
//         <Toast key={id} variant={variant} {...props}>
//           <div className="grid gap-1">
//             {title && <ToastTitle>{title}</ToastTitle>}
//             {description && <ToastDescription>{description}</ToastDescription>}
//           </div>
//           {action}
//           <ToastClose />
//         </Toast>
//       ))}
//       <ToastViewport />
//     </>
//   );
// }
