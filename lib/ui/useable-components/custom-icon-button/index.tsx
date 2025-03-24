import { IGlobalButtonProps } from "@/lib/utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
export default function CustomIconButton({
  Icon,
  title,
  handleClick,
  SvgIcon,
}: IGlobalButtonProps) {
  return (
    <Button
      className="flex items-center justify-between px-3 rounded-full border border-gray-300 p-3 w-full"
      onClick={handleClick}
    >
      {!!SvgIcon ?
        <SvgIcon width={30} height={30} />
      : <span>
          {!!Icon&&<FontAwesomeIcon
            icon={Icon}
            size="1x"
            color="white"
          />}
        </span>
      }
      <span className="">{title}</span>
    </Button>
  );
}
