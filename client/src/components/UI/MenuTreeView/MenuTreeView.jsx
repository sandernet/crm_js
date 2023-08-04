import { observer } from "mobx-react-lite";
import React from "react";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MenuTreeView = observer(({ arr, setItemMenu }) => {
  const renderTree = (node) => {
    const hasChildren = node.children && node.children.length > 0;
    return (
      <TreeItem
        nodeId={node.id}
        label={node.name}
        onClick={() => setItemMenu(node.id)}>
        {hasChildren && node.children.map((child) => renderTree(child))}
      </TreeItem>
    );
  };

  return (
    <TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ flexGrow: 1, maxWidth: "100%", overflowY: "auto" }}>
      {Array.isArray(arr) ? arr.map((item) => renderTree(item)) : null}
    </TreeView>
  );
});

export default MenuTreeView;
