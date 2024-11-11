import React, {ReactNode} from "react";

import StyledWrapper from "@/components/ui/StyledWrapper";
import StyledCard from "@/components/ui/StyledCard";
import CardContent from "@mui/material/CardContent";
import {StyledSubtitle, StyledTitle} from "@/components/ui/Typography";
import Form from "./form";


type Props = {
    children: ReactNode;
};

function Page() {
  return (
      <StyledWrapper>
          <StyledCard variant="outlined">
              <CardContent>
                  <StyledTitle>
                      Sign-in
                  </StyledTitle>
                  <StyledSubtitle>
                      Please sign-in with your credentials
                  </StyledSubtitle>
                  <Form/>
              </CardContent>
          </StyledCard>
      </StyledWrapper>
  );
}


export default Page;