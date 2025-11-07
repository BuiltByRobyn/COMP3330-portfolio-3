export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("img");
    const link = formData.get("link");
    const keywordsString = formData.get("keywords");
    const keywords = keywordsString ? JSON.parse(keywordsString) : [];
    console.log({ project: { title, description, img, link, keywords } })

    return Response.json({ ok: true, project: { title, description, img, link, keywords } }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
