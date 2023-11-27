// form
import { styled } from "@mui/material/styles";
import { FormProvider as Form } from "react-hook-form";

// ----------------------------------------------------------------------

const FormStyled = styled("form")({
  width: "100%",
});

export default function FormProvider({ children, onSubmit, methods, ...others }) {
  return (
    <Form {...methods}>
      <FormStyled onSubmit={onSubmit} {...others}>
        {children}
      </FormStyled>
    </Form>
  );
}
