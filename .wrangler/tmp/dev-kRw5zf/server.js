var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-WKXZR7/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// node_modules/itty-router/dist/itty-router.mjs
var e = /* @__PURE__ */ __name(({ base: e2 = "", routes: r = [] } = {}) => ({ __proto__: new Proxy({}, { get: (a, o, t) => (a2, ...p) => r.push([o.toUpperCase(), RegExp(`^${(e2 + a2).replace(/(\/?)\*/g, "($1.*)?").replace(/(\/$)|((?<=\/)\/)/, "").replace(/(:(\w+)\+)/, "(?<$2>.*)").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`), p]) && t }), routes: r, async handle(e3, ...a) {
  let o, t, p = new URL(e3.url), l = e3.query = {};
  for (let [e4, r2] of p.searchParams)
    l[e4] = void 0 === l[e4] ? r2 : [l[e4], r2].flat();
  for (let [l2, s, c] of r)
    if ((l2 === e3.method || "ALL" === l2) && (t = p.pathname.match(s))) {
      e3.params = t.groups || {};
      for (let r2 of c)
        if (void 0 !== (o = await r2(e3.proxy || e3, ...a)))
          return o;
    }
} }), "e");

// src/utils/randomInteger/index.ts
function mulberry32(a) {
  return function() {
    var t = a += 1831565813;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
__name(mulberry32, "mulberry32");
var random = mulberry32(42);
function getRandomInteger(max) {
  return Math.floor(random() * max);
}
__name(getRandomInteger, "getRandomInteger");
var randomInteger_default = getRandomInteger;

// src/handlers/absences/index.ts
var names = [
  {
    firstName: "Jabez",
    lastName: "Nasser",
    id: "24a9352b-cf35-4e00-b4c9-403546d7bea8"
  },
  {
    firstName: "Isla",
    lastName: "Watts",
    id: "08335a8f-1b4f-4d9b-82a8-46fa20d48f2d"
  },
  {
    firstName: "Malaysia",
    lastName: "Krueger",
    id: "f1128070-8fc9-4ccb-8657-f5e1c7cacad9"
  },
  {
    firstName: "Kylei",
    lastName: "Castanon",
    id: "8d0593d5-de4a-48c9-afa5-55127c0d349d"
  },
  {
    firstName: "Rheagan",
    lastName: "Hartfield",
    id: "59f7f608-05ad-4160-84b4-56800acfec3f"
  },
  {
    firstName: "Amiah",
    lastName: "Fenton",
    id: "6ebff517-f398-4d23-9ed3-a0f14bfa3858"
  },
  {
    firstName: "Kavion",
    lastName: "Melchor",
    id: "c7211b4f-7761-4012-a8a7-24e870227428"
  },
  {
    firstName: "Regan",
    lastName: "Quan",
    id: "c8010a64-4fc3-4da4-9181-48a17e9b3329"
  },
  {
    firstName: "Reuben",
    lastName: "Keene",
    id: "8c6d90a5-6636-46f9-93de-daa172b7496f"
  },
  {
    firstName: "Wesley",
    lastName: "Alvey",
    id: "3c2d82f1-660e-44ec-b25a-756baa6d0155"
  },
  {
    firstName: "Alexi",
    lastName: "Schramm",
    id: "8be1c549-fb91-4c8f-9cfe-5b5c017f26bf"
  },
  {
    firstName: "Zemirah",
    lastName: "Suber",
    id: "8ebe3d34-a20b-45eb-ae48-a2d40bdc63bc"
  },
  {
    firstName: "Rahaf",
    lastName: "Deckard",
    id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17"
  },
  {
    firstName: "Raniya",
    lastName: "Otte",
    id: "e10058e4-3383-466b-91d8-1ea5bf1acf0f"
  },
  {
    firstName: "Stacie",
    lastName: "Chancey",
    id: "23d9845c-8b03-4987-ac9e-98778100d4b8"
  },
  {
    firstName: "Josemaria",
    lastName: "Embrey",
    id: "6dc958b7-0aea-45d6-b4cc-ce384815dc17"
  },
  {
    firstName: "Enya",
    lastName: "Behm",
    id: "84502153-69e6-4561-b2de-8f21f97530d3"
  },
  {
    firstName: "Shrey",
    lastName: "Frederickson",
    id: "303aacc8-e587-4801-929a-ad7ce933ee03"
  },
  {
    firstName: "Ryland",
    lastName: "Sears",
    id: "6ed7cc5b-4a79-4802-a002-7918efc2d416"
  },
  {
    firstName: "Meryl",
    lastName: "Dreher",
    id: "8a396169-fb8c-4478-b5e9-4f1b14a01cf8"
  }
];
function getDate() {
  const newDate = /* @__PURE__ */ new Date();
  newDate.setTime(15778368e5 + randomInteger_default(31556926e3 * 4));
  return newDate.toISOString();
}
__name(getDate, "getDate");
function absenceType() {
  const rnd = randomInteger_default(200);
  if (rnd > 199) {
    return "FAMILY";
  }
  if (rnd > 190) {
    return "COMPASSIONATE_LEAVE";
  }
  if (rnd > 180) {
    return "MEDICAL";
  }
  if (rnd > 160) {
    return "SICKNESS";
  }
  return "ANNUAL_LEAVE";
}
__name(absenceType, "absenceType");
function getName() {
  return names[randomInteger_default(19)];
}
__name(getName, "getName");
var absences = Array(5e3).fill({}).map((_, i) => ({
  id: i,
  startDate: getDate(),
  days: randomInteger_default(21),
  absenceType: absenceType(),
  employee: getName(),
  approved: randomInteger_default(10) >= 9 ? false : true
}));
var Absences = /* @__PURE__ */ __name(({ query: { amount = 20 } }) => {
  const body = JSON.stringify(absences.slice(0, amount));
  return new Response(body, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400"
    }
  });
}, "Absences");
var absences_default = Absences;

// src/handlers/conflicts/index.ts
var Conflicts = /* @__PURE__ */ __name((request) => {
  const { id } = request.params;
  const random2 = mulberry32(parseInt(id, 10));
  const body = JSON.stringify({
    conflicts: random2() * 20 > 18
  });
  return new Response(body, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400"
    }
  });
}, "Conflicts");
var conflicts_default = Conflicts;

// src/server.ts
var router = e();
var handleRender = /* @__PURE__ */ __name(() => new Response("Hello from the server!"), "handleRender");
router.get("/api/absences", absences_default).get("/api/conflict/:id", conflicts_default).get("/", handleRender).get("*", () => new Response("Not found dude", { status: 404 }));
var server_default = {
  async fetch(request) {
    return router.handle(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-WKXZR7/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = server_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-WKXZR7/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=server.js.map
