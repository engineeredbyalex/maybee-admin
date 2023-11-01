import { useState } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Link from 'next/link';

const ToggledNavItem = ({ text, links }) => {
    const [isToggled, setIsToggled] = useState(!false);

    return (
        <div className={isToggled ? 'nav_item_unToggled' : 'nav_item_toggled'}>
            <div className="flex items-center justify-between w-[15rem]">
                <span className="text_dark text">{text}</span>
                <button onClick={() => setIsToggled(!isToggled)}>
                    {!isToggled ? (
                        <MdOutlineArrowDropDown size={30} />
                    ) : (
                        <MdOutlineArrowDropDown size={30} className="rotate-[-90deg]" />
                    )}
                </button>
            </div>
            {!isToggled ? (
                <div className="flex flex-col gap-5 text-center">
                    {links.map((link, index) => (
                        <Link onClick={() => setIsToggled(!isToggled)} key={index} href={link.url}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default ToggledNavItem;
