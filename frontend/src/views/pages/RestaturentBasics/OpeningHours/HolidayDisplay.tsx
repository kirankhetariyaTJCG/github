// React Imports
import { useEffect, useState } from "react";

// MUI Imports
import { Box, Card, Typography, Divider, IconButton } from "@/Helper/MUIImports"

// Third Party Imports
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// Custom Imports
import CsDelete from "@/@core/components/CsDelete";

// Store Imports
import { deletePauseServices, getPauseServices } from "@/redux-store/RestaurantsServiceSchedules/Action";

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Props {
  editFormData: (service: any, value: boolean) => void;
  setIsFormShow: (state: { type: string; show: boolean }) => void
}

const HolidayDisplay = (props: Props) => {

  // Props
  const { setIsFormShow, editFormData } = props;

  // State
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })

  // Hooks
  const { pauseServices } = useSelector((state: any) => state.service_schedules);
  const loading = useSelector((state: any) => state.service_schedules.loading)
  const { restaurant } = useSelector((state: any) => state.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPauseServices({
        data: { restaurant_id: restaurant?._id },
        old_pause_services_data: pauseServices
      })
    )
  }, [])

  useEffect(() => {
    !loading && setIsDelete({ open: false, id: '' })
  }, [loading])

  return (
    <>
      <Box
        sx={{
          p: 3,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
        }}>
        {Array.isArray(pauseServices) && pauseServices?.length > 0 ?
          <>
            {pauseServices?.map((service: any, index: number) => {
              return (
                <Card
                  key={index}
                  sx={{ mb: 4, p: 4 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: "100%" }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }} color='textPrimary'>
                      {service?.name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 600 }}>
                      {"("}
                      {service?.end_date !== service?.start_date ? (
                        <>
                          {moment(service?.start_date).format('MMMM D, YYYY')} - {moment(service?.end_date).format('MMMM D, YYYY')}
                        </>
                      ) : (
                        moment(service?.start_date).format('MMMM D, YYYY')
                      )}
                      {")"}
                    </Typography>
                    <Box>
                      <IconButton
                        color='success'
                        onClick={() => {
                          setIsFormShow({ type: "EDIT", show: true })
                          editFormData(service, true)
                        }}
                      >
                        <Icon icon={'bx:edit'} />
                      </IconButton>
                      <IconButton
                        color='error'
                        onClick={() => setIsDelete({ open: true, id: service?._id })}
                      >
                        <Icon icon={'ic:twotone-delete-outline'} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                    {Array.isArray(service?.intervals) &&
                      service?.intervals?.length > 0 &&
                      service?.intervals?.map((interval: any, index: number) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Typography>{interval?.type}</Typography>
                            <Box>
                              {interval?.hours && interval?.hours?.length > 0
                                ? interval?.hours?.map((time: any, i: number) => {
                                  return (
                                    <Typography key={i}>
                                      {moment(time?.start_time).format("hh:mm A")} - {moment(time?.end_time).format("hh:mm A")}
                                    </Typography>
                                  )
                                })
                                : <Typography>Closed</Typography>
                              }
                            </Box>
                          </Box>
                        )
                      })}
                  </Box>
                </Card>
              )
            }
            )}
          </>
          : <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>No Holiday And Pause Services Data Found</Typography>
          </Box>
        }
      </Box>
      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Exception'
        loading={loading}
        handleDelete={() => dispatch(deletePauseServices(isDelete?.id))}
      />
    </>
  )
};

export default HolidayDisplay;
