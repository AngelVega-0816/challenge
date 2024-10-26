import { Backdrop, Fade, Modal, Stack, Typography } from "@mui/material";
import usePostsStore from "../store/postsStore.store";
import BaseInputText from "./baseInputText";
import { useEffect, useState } from "react";
import { errorMessages } from "../utils/messages";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuthStore from "../store/auth.store";

const FormPost = () => {
  const { user } = useAuthStore();
  const {
    post,
    showModal,
    setShowModal,
    createPostStore,
    typeForm,
    updatePostStore,
  } = usePostsStore();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState("");
  const [request, setRequest] = useState({
    loading: false,
    showSuccess: false,
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!formData.title && !formData.body) {
      setError(errorMessages.inputsRequired);
      return;
    }
    if (!error) {
      setRequest((prev) => ({ ...prev, loading: true }));
      console.log(post);
      if (typeForm === "create" && user) {
        createPostStore({
          title: formData.title,
          body: formData.body,
          userId: user.id,
        })
          .then(() => {
            setRequest((prev) => ({ ...prev, showSuccess: true }));
            setTimeout(() => {
              setRequest((prev) => ({ ...prev, showSuccess: false }));
            }, 2000);
          })
          .finally(() => setRequest((prev) => ({ ...prev, loading: false })));
        setError("");
      } else if (post?.id) {
        updatePostStore({ ...post, ...formData }).finally(() =>
          setRequest((prev) => ({ ...prev, loading: false }))
        );
      }
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    if (error && !formData.title && !formData.body) setError("");
  };

  useEffect(() => {
    return () => {
      setError("");
      setFormData({ title: "", body: "" });
      setRequest({
        loading: false,
        showSuccess: false,
      });
    };
  }, [showModal]);

  useEffect(() => {
    if (typeForm === "update" && post)
      setFormData({ title: post?.title, body: post?.body });
  }, [post]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={showModal}
      onClose={setShowModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={showModal}>
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
        >
          <BaseInputText
            placeholder="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <BaseInputText
            placeholder="body"
            name="body"
            multiline
            rows={4}
            value={formData.body}
            onChange={handleChange}
          />
          {request.showSuccess && (
            <Typography variant="body2" color="success.main">
              ¡Se {typeForm === "create" ? "creó" : "actualizó"} con éxito!
            </Typography>
          )}
          <LoadingButton type="submit" loading={request.loading}>
            Crear
          </LoadingButton>
        </Stack>
      </Fade>
    </Modal>
  );
};

export default FormPost;
