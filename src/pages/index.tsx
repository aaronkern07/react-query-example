import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import Link from "next/link";
// import { useState, createContext } from "react";

// export async function getServerSideProps() {
//     const posts = await fetchTechnologies();
//     return { props: { posts } };
// }

/* Fetch technologies */

const fetchTechnologies = async () => {
    let fetchData;
    await fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((res) => {
            console.log("Fetched response: ", res);

            //If the request is undefined then set default values for the fetchData
            // res = undefined;
            if (!res || !res.ok) {
                console.log("Error undefined");
                fetchData = [
                    {
                        userId: 1,
                        id: 1,
                        title: "Default Data Title",
                        body: "This is the default data that shows up if an error happens during fetch.",
                    },
                ];
            } else {
                fetchData = res.json();
            }
        })
        //If the fetch fails then set default values for the fetchData
        .catch((err) => {
            fetchData = [
                {
                    userId: 1,
                    id: 1,
                    title: "Default Data Title",
                    body: "This is the default data that shows up if an error happens during fetch.",
                },
            ];
            console.log("Error fetching technologies");
            console.log(err);
        });
    // console.log("fetchData: ", fetchData);
    // Array.isArray(fetchData) ? console.log("It's an Array") : console.log("It's not an Array");
    return fetchData;
};

/* Homepage Component */

const Home: NextPage = () => {
    interface InfoInterface {
        userId: number;
        id: number;
        title: string;
        body: string;
    }
    const { data, isLoading, isError, status } = useQuery("posts", fetchTechnologies);
    if (isLoading) {
        return (
            <LayoutContainer>
                <div>Loading... {status}</div>
            </LayoutContainer>
        );
    }
    if (isError) {
        return (
            <LayoutContainer>
                <div>Error grabbing data... {status}</div>
            </LayoutContainer>
        );
    }

    let dataMap: InfoInterface[];

    Array.isArray(data) ? (dataMap = data) : (dataMap = [data]);

    return (
        <>
            <LayoutContainer>
                <div id="hello-react-query">
                    <h1 className="text-5xl font-bold">HELLO</h1>
                    <h1>This is a test for React Query.</h1>
                    {dataMap.map((post: InfoInterface) => (
                        <InfoCard key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body} />
                    ))}
                    <p>{status}</p>
                </div>
            </LayoutContainer>
        </>
    );
};

export default Home;

/* Info Card Component */

type InfoCardProps = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const InfoCard = ({ userId, id, title, body }: InfoCardProps) => {
    return (
        <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl m-5">
            <h2 className="text-lg text-black-500 font-bold">{title}</h2>
            <h3 className="text-sm text-black-500">User ID: {userId}</h3>
            <h3 className="text-sm text-black-500">Post ID: {id}</h3>
            <p className="text-sm text-black-600">{body}</p>
        </section>
    );
};

/* Main Content Container Component */

type MainContentProps = {
    children: JSX.Element;
};

export function MainContent({ children }: MainContentProps) {
    return (
        <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">{children}</main>
    );
}

/* Layout Container Component */

type LayoutContainerProps = {
    children: JSX.Element;
};

export function LayoutContainer({ children }: LayoutContainerProps) {
    return (
        <>
            <Head>
                <title>React Query Test</title>
                <meta name="React Query Test" content="A test for React Query with the T3 stack" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="{styles.header}">
                <Link href="/page-one">
                    <a>Page One</a>
                </Link>
                <MainContent>{children}</MainContent>
            </header>
        </>
    );
}
