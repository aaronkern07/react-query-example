import type { NextPage } from "next";
import Link from "next/link";

const PageOne: NextPage = () => {
    return (
        <div>
            <h1>Page One Hurray!</h1>
            <Link href="/">
                <a>Go back home...</a>
            </Link>
        </div>
    );
};

export default PageOne;
