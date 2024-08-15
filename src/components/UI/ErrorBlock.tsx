type ErrorInfo = {
  title: string;
  message: string;
};

export default function ErrorBlock({ title, message }: ErrorInfo) {
  return (
    <div className="border bg-red-500 r-8 rounded-lg p-8 mt-32">
      <div className="text-white">
        <h2 className="mb-4">{title} !</h2>
        <p>{message}.</p>
      </div>
    </div>
  );
}
