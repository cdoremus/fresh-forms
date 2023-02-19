import { Handlers, HandlerContext, PageProps } from "$fresh/server.ts";
import { multiParser } from 'https://deno.land/x/multiparser@v2.1.0/mod.ts';

export const handler: Handlers = {
  GET(_req: Request, ctx: HandlerContext) {
    console.log("Inside GET");
    return ctx.render({ ...ctx.state });
  },

  async POST(req: Request, ctx: HandlerContext) {
    console.log("Inside POST");
    console.log("Context: ", JSON.stringify(ctx));
    // console.log("Request body: ", JSON.stringify(req.body));
    // const file = (await req.formData()).get("input");
    // console.log("FILE ", file);
    console.log("content-type: ", req.headers.get('content-type'));
    //read body
    const reader = await req.body?.getReader();
    if (reader) {
      while(true) {
        const read = await reader.read();
        if (!read.done) {
          const ints = read.value;
          // console.log("VALUE: ", ints);
          const enc = new TextDecoder("utf-8");
          console.log("STR", enc.decode(ints));
        } else {
          break;
        }
      }
    } else {
      console.log("Null reader");
    }


    // const url = new URL(req.url);
    // console.log("URL: ", url.toJSON());
    // const form = await req.formData();
    // console.log("FORM DATA input: ", JSON.stringify(form.entries));
    // resp.headers.set("X-Custom-Header", "Hello");
    // return resp;
    const resp = new Response("", {
      status: 303,
      headers: { Location: "/upload" },
    });
    return resp;
  },
};

export default function FileUploadPage() {
  return (
    <main>
      <h1>File Upload</h1>
      <p>This is the File Upload page.</p>
    </main>
  );
}

