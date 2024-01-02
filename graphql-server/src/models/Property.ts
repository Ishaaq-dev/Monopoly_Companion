import { builder } from "../builder";

builder.prismaObject("Property", {
    fields: (t) => ({
        id: t.exposeID("id"),
        title: t.exposeString("title"),
        type: t.exposeString("type")
    })
});