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
        className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
      />
    </a>
  );
};

export default BoltBadge;