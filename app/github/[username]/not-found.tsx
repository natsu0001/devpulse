
import ErrorState from "@/app/components/ui/ErrorState";

const NotFound = () => {
  return (
    <ErrorState
      title="User not found"
      message="We couldn't find that GitHub profile. Check the username and try again."
    />
  );
};

export default NotFound;