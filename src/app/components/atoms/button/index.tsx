"use client";
// Button.tsx (หรือไฟล์ Button ของคุณ)
type ButtonProps = {
  label: string;
  onClick?: () => void;
  className: string;
  children?: React.ReactNode; // เพิ่ม props นี้
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  children,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {children || label} {/* ถ้าไม่มี children ก็ใช้ label */}
    </button>
  );
};

export default Button;
