export default function PageHeader({ title, description }: { title: string, description?: string }) {
  return (
    <div className="bg-slate-900 pt-24 lg:pt-32 pb-12 lg:pb-16 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
