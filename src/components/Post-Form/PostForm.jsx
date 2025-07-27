import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Select, RTE } from "../index";
import { useForm, Controller } from "react-hook-form";
import appwriteService from "../../Appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import conf from "../../conf/conf";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          value.title
            ?.trim()
            .toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-"),
          { shouldValidate: true }
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

 useEffect(() => {
  if (!post?.featuredimage) return;

  const previewUrl = appwriteService.getFilePreview(post.featuredimage);
  setImageUrl(previewUrl?.href || "");
}, [post?.featuredimage]);

  

 

  const onSubmit = async (data) => {
    try {
      let fileId = post?.featuredimage;

      if (data.Image?.[0]) {
        const uploadedFile = await appwriteService.uploadFile(data.Image[0]);
        if (uploadedFile) {
          fileId = uploadedFile.$id;
          if (post?.featuredimage) {
            await appwriteService.deleteFile(post.featuredimage);
          }
        }
      }

      const payload = {
        ...data,
        featuredimage: fileId,
        userid: userData?.$id || "",
      };

      const dbPost = post
        ? await appwriteService.updatePost(post.$id, payload)
        : await appwriteService.createDocument(payload);

      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`);
      }
    } catch (err) {
      console.error("🚨 Failed to submit post:", err);
    }
  };

  return (
    <div className="container py-5">
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="mb-4 text-center">
          {post ? "Edit Post" : "Create Post"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
          {/* Title */}
          <div className="col-md-6">
            <Input
              label="Title"
              placeholder="Enter title"
              {...register("title", { required: true })}
              className="text-black bg-white"
            />
            {errors.title && <p className="text-danger">Title is required.</p>}
          </div>

          {/* Slug */}
          <div className="col-md-6">
            <Input
              label="Slug"
              placeholder="Auto-generated slug"
              {...register("slug", { required: true })}
              className="text-black bg-white"
              readOnly
            />
            {errors.slug && <p className="text-danger">Slug is required.</p>}
          </div>

          {/* Content */}
          <div className="col-12">
            <Controller
              control={control}
              name="content"
              rules={{ required: "Content is required" }}
              render={({ field }) => <RTE label="Content" {...field} />}
            />
            {errors.content && (
              <p className="text-danger">Content is required.</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="col-md-6">
            <Input
              label="Featured Image"
              type="file"
              accept="image/*"
              {...register("Image", { required: !post })}
            />
            {!post && errors.Image && (
              <p className="text-danger">Image is required for new posts.</p>
            )}
          </div>

          {/* Existing Image Preview */}
          {post?.featuredimage && imageUrl && (
            <div className="col-md-6 text-center">
              <img
                src={imageUrl}
                alt={post.title}
                className="img-fluid rounded shadow-sm"
                style={{ maxWidth: "300px" }}
              />
            </div>
          )}

          {/* Status */}
          <div className="col-md-6">
            <Select
              label="Status"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              {...register("status", { required: true })}
            />
            {errors.status && (
              <p className="text-danger">Status is required.</p>
            )}
          </div>

          {/* Submit */}
          <div className="col-12 text-center">
            <Button type="submit" className="btn px-4">
              {post ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;



