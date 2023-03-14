import type { User } from "../../../entities/User";

import jwt from "jsonwebtoken";
import moment from "moment";
import parser from "ua-parser-js";
import envConfigs from "../../../configs/envConfigs";
import { RefreshToken } from "../../../entities/RefreshToken";

interface IParams {
  ctx: MyContext;
  user: User;
}

const processTokens = async ({ ctx, user }: IParams) => {
  const accessExpires = moment().add(1, "hours").toDate();
  const refrshExpires = moment().add(7, "days").toDate();
  const { browser, os, device } = parser(ctx.req.headers["user-agent"]);

  const refreshPayload = {
    browser: `${browser?.name ?? ""} ${browser?.version ?? ""}`,
    system: `${os?.name ?? ""} ${os?.version ?? ""}`,
    device: `${device?.vendor ?? ""} ${device?.model ?? ""}`,
    user: { id: user?.id },
  };

  let refreshToken;
  try {
    refreshToken = await RefreshToken.findOneByOrFail({ ...refreshPayload });

    refreshToken.validUntil = refrshExpires;
    await refreshToken.save();
  } catch (_) {
    refreshToken = await RefreshToken.create({
      ...refreshPayload,
      validUntil: refrshExpires,
    }).save();
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    envConfigs.secret as string,
    {
      expiresIn: "1h",
    }
  );

  ctx.res?.cookie("__a_t", accessToken, {
    expires: accessExpires,
    path: "/graphql",
    httpOnly: true,
    secure: envConfigs.isProd as boolean,
    sameSite: envConfigs.isProd ? "none" : "lax",
  });

  ctx.res?.cookie("__r_t", refreshToken?.token, {
    expires: refrshExpires,
    path: "/graphql",
    httpOnly: true,
    secure: envConfigs.isProd as boolean,
    sameSite: envConfigs.isProd ? "none" : "lax",
  });
};

export default processTokens;
