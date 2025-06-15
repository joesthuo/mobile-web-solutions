interface PortfolioCardProps {
    title: string
    description: string
    image: string
  }
  
  export default function PortfolioCard({ title, description, image }: PortfolioCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    )
  }