import { UIMessage } from "ai";
import { CircleX } from "lucide-react";
import { FC } from "react";

export const Messages: FC<{
  messages: UIMessage[];
  error: Error | undefined;
  retry: () => void;
}> = ({ messages, error, retry }) => {
  return (
    <div className="flex-1 overflow-y-scroll pt-4 relative px-4 w-full">
      <div className="md:max-w-3xl mx-auto flex flex-col min-w-0 gap-6 pb-6">
        {messages.map((message) => {
          return message.role === "user" ? (
            <UserMessage key={message.id} message={message} />
          ) : (
            <AssistantMessage key={message.id} message={message} />
          );
        })}
        {error ? (
          <ErrorMessage error={"Something went wrong"} retry={retry} />
        ) : null}
      </div>
    </div>
  );
};

const UserMessage: FC<{ message: UIMessage }> = ({ message }) => {
  return (
    <div className="text-black self-end max-w-3/4 bg-gray-100/80 px-4 py-2 rounded-3xl">
      {message.content}
    </div>
  );
};

const AssistantMessage: FC<{ message: UIMessage }> = ({ message }) => {
  return (
    <div className="text-justify dark:text-gray-300 text-gray-600">
      {message.content}
    </div>
  );
};

const ErrorMessage: FC<{ error: string; retry: () => void }> = ({ error }) => {
  return (
    <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start space-x-2">
        <div className="flex-shrink-0">
          <CircleX className="text-red-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-red-800">{error}</h4>
          <div className="flex space-x-3 mt-2">
            <button className="text-sm text-red-600 hover:text-red-800 underline">
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
