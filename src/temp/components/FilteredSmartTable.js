import React, { useState } from "react";
import PropTypes from "prop-types";
import { CSmartTable } from "@coreui/react-pro";

const FilteredSmartTable = ({
  items,
  columns,
  selected,
  setSelectedItems,
  setSelectedItemCount,
  ...restProps
}) => {
  const [allSelected, setAllSelected] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const onFilteredItemsChange = async (filtered_items) => {
    const updatedSelection = selected.filter((selectedItem) =>
      filtered_items.find((this_item) => this_item.key === selectedItem.key)
    );

    setSelectedItems(updatedSelection);
    setSelectedItemCount(updatedSelection.length);

    if (allSelected) {
      setAllSelected(false);
    }

    setFilteredItems([...filtered_items]);
  };

  const onSelectedItemsChange = async (selected_items) => {
    if (selected_items.length === items?.length) {
      setSelectedItems([...filteredItems]);
      setAllSelected(true);
    } else {
      setAllSelected(false);
      setSelectedItems(selected_items);
      setSelectedItemCount(selected_items.length);
    }
  };

  return (
    <CSmartTable
      items={items}
      columns={columns}
      noItemsLabel=""
      // columnFilter
      // columnSorter
      pagination
      selectable
      active
      clickableRows
      onSelectedItemsChange={onSelectedItemsChange}
      onFilteredItemsChange={onFilteredItemsChange}
      itemsPerPageSelect
      itemsPerPage={20}
      selected={selected}
      tableProps={{ hover: true, responsive: true, striped: true }}
      {...restProps}
    />
  );
};

FilteredSmartTable.propTypes = {
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  selected: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
  setSelectedItemCount: PropTypes.func.isRequired,
  onSelectedItemsChange: PropTypes.func.isRequired,
};

FilteredSmartTable.defaultProps = {
  onRowClick: () => {},
};

export default FilteredSmartTable;
