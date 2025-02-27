// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'

const Step3 = (props: { value: number | null; setValue: (value: number) => void }) => {
  // Props
  const { value, setValue } = props

  const AddressData: any = [
    {
      company_name: 'TJCG Pvt Ltd',
      contact_number: '+91 7043484084',
      address: '901, Runway Runway Heights, 150 Feet Ring Rd, Krishna Society, Madhapar, Rajkot, Gujarat 360007',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.8171565821863!2d70.76562071051002!3d22.322753779585586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca7bcc108ebd%3A0x187fd8e3f6d7f16c!2sTJCG%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1727331071879!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
    },
    {
      company_name: 'Saraza | Best Banquet Hall & Restaurant',
      contact_number: '+91 7272872727',
      address: 'Saraza, Kalavad Rd, opp. Cosmoplex Cinema, Rajkot, Gujarat 360005',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.21491170452!2d70.73876941050825!3d22.269847479623927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cbfd43bdd08d%3A0x233ef9814264f68d!2sSaraza%20%7C%20Best%20Banquet%20Hall%20%26%20Restaurant%20in%20Rajkot!5e0!3m2!1sen!2sin!4v1727331382393!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
    },
    {
      company_name: 'ITC Narmada, a Luxury Collection Hotel',
      contact_number: '+91 7969664000',
      address: 'Survey # 104 A, Judges Bunglow Rd, I I M, Vastrapur, Ahmedabad, Gujarat 380015',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.840984797656!2d72.52749471053276!3d23.029610079081895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84c92801abe1%3A0x1e87b88447826d9e!2sITC%20Narmada%2C%20a%20Luxury%20Collection%20Hotel%2C%20Ahmedabad!5e0!3m2!1sen!2sin!4v1727331618779!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
    }
  ]

  return (
    <Box sx={{ overflow: 'auto', height: 'calc(100vh - 12rem)' }}>
      {Array.isArray(AddressData) &&
        AddressData?.length > 0 &&
        AddressData?.map((item: any, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                border: theme => `1px solid ${theme.palette.divider}`,
                cursor: 'pointer',
                borderRadius: '8px',
                p: 4,
                mb: 4
              }}
              onClick={() => setValue(index)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '70%' }}>
                  <Radio checked={value === index} value={index} />
                  <Box>
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 600 }}>{item?.company_name}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, my: 2 }}>{item?.address}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                      Contact No: {item?.contact_number}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '30%',
                    height: '7rem',
                    border: theme => `1px solid ${theme.palette.divider}`,
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  <iframe
                    src={item?.map}
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading='lazy'
                  />
                </Box>
              </Box>
            </Box>
          )
        })}
    </Box>
  )
}

export default Step3
