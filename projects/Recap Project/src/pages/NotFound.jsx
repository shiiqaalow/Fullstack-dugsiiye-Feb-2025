import { useRouteError } from "react-router";

const NotFound = () => {
    // const error = useRouteError();

    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-gray-300">
               Page is not found!
            </p>
        </div>
    );
};

export default NotFound;
