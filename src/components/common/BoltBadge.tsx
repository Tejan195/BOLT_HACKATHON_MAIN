import React from 'react';

const BoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 z-40 transition-transform duration-300 hover:scale-110 md:right-6 lg:right-8"
      style={{ top: 'calc(4rem + 1.5rem)' }}
    >
      <img
        src="/white_circle_360x360.png"
        alt="Built with Bolt"
        width={60}
        height={60}
        className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
      />
    </a>
  );
};

export default BoltBadge;