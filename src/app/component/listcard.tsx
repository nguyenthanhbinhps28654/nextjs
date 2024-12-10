import Link from 'next/link';

export default function ListCard(props: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {props.data.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 my-4">
          <img src={item.image} alt={item.title} className="w-full object-center" />
          <div className="mt-4">
            <Link href={`/chitiet/${item.id}`}>
              <h2 className="text-xl font-semibold">{item.name}</h2>
            </Link>
            <p className="mt-2 text-gray-600">{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}