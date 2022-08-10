import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ChildModal from "./ChildModal";
import { useState, useContext } from "react";
import ReactContext from "./context/react.context";

export default function ContainerModalView(props) {
  const reactCtx = useContext(ReactContext);

  // open delete confirmation modal
  const [openChild, setOpenChild] = useState(false);
  const handleDelete = () => {
    console.log(
      `delete btn clicked for product #${reactCtx.modalProduct.product_code}`
    );
    setOpenChild(true);
  };

  // toggle isEditing = true
  const handleEdit = () => {
    reactCtx.setIsEditing(true);
  };

  return (
    <div>
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        align="center"
        sx={{ mb: 2 }}
      >
        {reactCtx.modalProduct.name}
      </Typography>
      <div className="flex justify-center">
        <img src={reactCtx.modalProduct.img} width="300" height="300" />
      </div>
      <div>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          <Typography variant="overline">[brand]</Typography>
          &nbsp;
          {reactCtx.modalProduct.brand}
          <br />
          <Typography variant="overline">[size]</Typography>&nbsp;
          {reactCtx.modalProduct.length} (L) ×&nbsp;
          {reactCtx.modalProduct.depth} (D) ×&nbsp;
          {reactCtx.modalProduct.height} (H) cm
          <br />
          <Typography variant="overline">[price]</Typography> $x
          <br />
          <Typography variant="overline">[link]</Typography> xxx.com
        </Typography>
      </div>
      <br />
      <div className="flex justify-center">
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </div>
      {/* CHILD MODAL STARTS  */}
      <ChildModal
        openChild={openChild}
        setOpenChild={setOpenChild}
        // delData={delData}
      />
      {/* CHILD MODAL ENDS */}
    </div>
  );
}
