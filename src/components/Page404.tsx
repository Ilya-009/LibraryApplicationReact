import React, {FC} from "react";

//Import styles
import {Link} from "react-router-dom";

export const Page404: FC = () => {
    return (
        <section>
            <h1>Упс! Похоже вы перешли на несуществующую страницу</h1>
            <h3>
                <Link to="/">Перейти на главную</Link>
            </h3>
        </section>
    );
};