export default function UiShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto py-8">
      {children}
    </div>
  )
} 