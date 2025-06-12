import { getCredentialsForUser } from "@/actions/credentials";
import { Card } from "@/components/ui/card";
import {
  CREDENTIALS_SIZE_ICON,
  DEFAULT_ICON_SIZE,
} from "@/constants/constants";
import { LockKeyhole, ShieldOff } from "lucide-react";
import React from "react";
import CreateCredentialDialog from "./create-credential-dialog";
import { formatDistanceToNow } from "date-fns";
import DeleteCredentialDialog from "./delete-credential-dialog";

const UserCredentials = async () => {
  const credentials = await getCredentialsForUser();

  if (!credentials) {
    return <div>Something went wrong</div>;
  }

  if (credentials.length === 0) {
    return (
      <Card className="w-full p-4">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="rounded-full bg-accent h-20 w-20 flex justify-center items-center">
            <ShieldOff
              size={CREDENTIALS_SIZE_ICON}
              className="stroke-primary"
            />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="text-bold">No credentials created yet</p>
            <p className="text-sm text-muted-foreground">
              Click the button below to create your first credential
            </p>
          </div>
          <CreateCredentialDialog triggerText="Create your first credential" />
        </div>
      </Card>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {credentials.map((credential) => {
        const createdAt = formatDistanceToNow(credential.createdAt, {
          addSuffix: true,
        });
        return (
          <Card key={credential.id} className="w-full p-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="rounded-full bg-primary/10 h-8 w-8 flex justify-center items-center">
                <LockKeyhole
                  size={DEFAULT_ICON_SIZE}
                  className="stroke-primary"
                />
              </div>
              <div>
                <p className="font-bold">{credential.name}</p>
                <p className="text-xs text-muted-foreground">{createdAt}</p>
              </div>
            </div>
            <DeleteCredentialDialog name={credential.name} />
          </Card>
        );
      })}
    </div>
  );
};

export default UserCredentials;
