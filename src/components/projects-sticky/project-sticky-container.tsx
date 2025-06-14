import { cn } from "dlx-components";


interface ProjectStickyContainerProps {
  className: string;
  //isLast: boolean;
  children: React.ReactNode;
}

export const ProjectStickyContainer = ({
  className,
  //isLast,
  children,
}: ProjectStickyContainerProps) => {
  return (
    <>
      <section className={cn('sticky top-0', className)}>{children}</section>
       {/* {!isLast && <div className='h-[100vh]'></div>}  */}
    </>
  );
};
