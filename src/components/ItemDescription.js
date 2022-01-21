import React from "react";

const ItemDescription = (props) => {
  const itemProperties = props.itemProperties;
  const url = `https://xivapi.com${itemProperties.imageURL}`;
  const hqable = itemProperties.canBeHq ? 'Yes' : 'No';
  const hqableClass = itemProperties.canBeHq ? 'green-text' : 'red-text';

  return (
    <section className="item-description">
      <img className="item-image" src={url} alt="Item Image" />
      <h2 className="item-name">{itemProperties.name}</h2>
      <p className="description">{itemProperties.description}</p>
      <p className="hqable">
        HQ-able: <span className={hqableClass}>{hqable}</span>
      </p>
      <p className="stack-size">Stack Size: {itemProperties.stackSize}</p>
    </section>
  );
};

export default ItemDescription;
