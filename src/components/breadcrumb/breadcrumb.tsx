import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
    items: { label: string; path: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
                    >
                        {index === items.length - 1 ? (
                            item.label
                        ) : (
                            <Link href={item.path}>
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;