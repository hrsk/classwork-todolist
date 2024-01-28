import { AddBox } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { memo, useCallback } from "react";

type PropsType = {
    name: string;
    callback: () => void;
};
export const ButtonComponent = memo((props: PropsType) => {
    const onClickHandler = useCallback(() => {
        props.callback();
    }, []);

    return (
        <IconButton onClick={onClickHandler} color={"primary"} size={"small"}>
            <AddBox />
        </IconButton>
    );
});
