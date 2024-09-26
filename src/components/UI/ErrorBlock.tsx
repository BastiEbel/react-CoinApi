type ErrorInfo = {
  title: string;
  message: string;
};

export default function ErrorBlock({ title, message }: ErrorInfo) {
  return (
    <div className="glass p-8">
      <div className="text-red-500">
        <h2 className="mb-4">{title} !</h2>
        <p>{message}.</p>
      </div>
    </div>
  );
}
