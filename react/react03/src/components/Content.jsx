import { memo } from "react";

function Content() {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione explicabo reiciendis, laudantium ipsum
        laboriosam molestiae at aliquam ad vitae necessitatibus vero ex sequi quas excepturi distinctio nisi modi
        incidunt voluptatibus!
      </p>
    </div>
  );
}

export default memo(Content);
