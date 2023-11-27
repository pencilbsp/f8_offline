import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { Alert, Stack } from "@mui/material";
// routes
// hooks
import useAuth from "@/hooks/useAuth";
// components
import { FormProvider, RHFTextField } from "@/components/hook-form";

// ----------------------------------------------------------------------

export default function LoginForm({ sx }) {
  const { login } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email của bạn không hợp lệ").required("Nhập địa chỉ email của bạn"),
  });

  const defaultValues = { email: "" };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      setError("afterSubmit", { ...error, message: error.message });
    }
  };

  return (
    <FormProvider sx={sx} methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Stack spacing={2}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField size="small" name="email" label="Địa chỉ email" />
        </Stack>

        <LoadingButton fullWidth type="submit" variant="contained" loading={isSubmitting}>
          Đăng nhập
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
