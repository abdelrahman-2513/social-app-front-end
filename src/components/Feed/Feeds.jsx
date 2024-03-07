import Feed from "./Feed";

function Feeds() {
  const feeds = [1, 2, 3, 4, 5];

  return (
    <div className="feeds-container">
      {feeds.map((fed) => {
        return <Feed key={fed} />;
      })}
    </div>
  );
}

export default Feeds;
