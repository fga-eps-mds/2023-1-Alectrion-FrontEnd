import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon, ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
import { BiSearch } from 'react-icons/bi';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  TableContainer,
  Divider,
  Box,
  useDisclosure,
  Flex,
  Grid,
  GridItem,
  Checkbox,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { AiFillFilePdf } from 'react-icons/ai';
import { TIPOS_RELATORIO } from '@/constants/reports';
import { toast } from '@/utils/toast';
import { SideBar } from '@/components/side-bar';
import { api, apiSchedula } from '../../config/lib/axios';
import { theme } from '@/styles/theme';
import { STATUS, TIPOS_EQUIPAMENTO, Workstation } from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';
import { ReportRegisterModal } from '@/components/report-register-modal';
import { ReportViewModal } from '@/components/report-view-modal';

interface ISelectOption {
  label: string;
  value: number | string;
}

type FilterValues = {
  type?: ISelectOption;
  brand?: string;
  lastModifiedDate?: string;
  unit?: ISelectOption;
  situation?: ISelectOption;
  search: string;
  lowerDate: Date;
  higherDate: Date;
};

function ReportsTable() {
  const [reports, setReports] = useState<any[]>([]);
  const [nextReports, setNextReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | undefined>();
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);
  const [workstations, setWorkstations] = useState<ISelectOption[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const {
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();

  const handleFilterChange = () => {
    const { type, lastModifiedDate, situation, unit } = watchFilter;

    let formattedDate;
    if (
      lastModifiedDate !== null &&
      lastModifiedDate !== '' &&
      lastModifiedDate
    ) {
      formattedDate = new Date(lastModifiedDate).toLocaleDateString('en-us');
    }

    const dataFormatted = {
      type,
      updatedAt: formattedDate,
      situation,
      unit,
      search,
    };

    const filteredDataFormatted = [
      ...Object.entries(dataFormatted).filter(
        (field) => field[1] !== undefined && field[1] !== ''
      ),
    ];

    const query = `${filteredDataFormatted
      .map((field) => `${field[0]}=${field[1]}`)
      .join('&')}`;
    setFilter(query);
  };

  const cleanFilters = () => {
    setFilter('');
    setSearch('');
    reset();
  };

  const {
    isOpen: isViewOpen,
    onClose: onViewClose,
    onOpen: onViewOpen,
  } = useDisclosure();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const formattedWorkstations = (data: Workstation[]): ISelectOption[] => {
    return data?.map((item: Workstation) => {
      return { label: item?.name, value: item?.name };
    });
  };

  const handleView = (report: any) => {
    if (report) setSelectedReport(report);
    onViewOpen();
  };

  const getWorkstations = async () => {
    apiSchedula
      .get<Workstation[]>('workstations')
      .then((response) => {
        setWorkstations(formattedWorkstations(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };
  const handleSearch = debounce(() => {
    setSearch(watchFilter.search);
  }, 400);

  const fetchItems = async () => {
    try {
      const { data }: AxiosResponse<any[]> = await api.get(
        `equipment/find?take=${limit}&skip=${offset}&${filter}`
      );
      setReports(data);
    } catch (error) {
      setReports([]);
      toast.error('Nenhum relaório encontrado');
    }
  };

  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<any[]> = await api.get(
        `equipment/find?take=${limit}&skip=${offset + limit}&${filter}`
      );
      setNextReports(data);
    } catch (error) {
      setNextReports([]);
      toast.error('Nenhum relaório encontrado');
    }
  };
  useEffect(() => {
    getWorkstations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSearch();
    handleFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFilter]);

  useEffect(() => {
    fetchItems();
    fetchNextItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, refreshRequest, filter]);

  return (
    <Grid templateColumns="1fr 5fr" gap={6}>
      <GridItem>
        <SideBar />
      </GridItem>
      <GridItem>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          width="100%"
        >
          <Flex flexDirection="column" width="80%">
            <Text
              margin="20px 0 15px 0"
              color={theme.colors.black}
              fontWeight="semibold"
              fontSize="4xl"
            >
              Relatórios
            </Text>
            <Flex justifyContent="space-between" width="100%">
              <Text color="#00000" fontWeight="medium" fontSize="2xl">
                Relatórios Gerados
              </Text>
              <Button colorScheme={theme.colors.primary} onClick={onOpen}>
                Gerar Relatório
              </Button>
            </Flex>
            <Divider borderColor="#00000" margin="15px 0 15px 0" />

            <Flex
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="left"
              width="100%"
            >
              <form id="equipment-filter" style={{ width: '100%' }}>
                <Flex gap="5px" alignItems="5px" mb="15px">
                  <NewControlledSelect
                    control={control}
                    name="type"
                    id="type"
                    options={TIPOS_RELATORIO}
                    placeholder="Tipo"
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                    filterStyle
                  />
                  <Datepicker
                    name="lowerDate"
                    control={control}
                    border={false}
                    placeholderText="Data inicial"
                  />
                  <Datepicker
                    name="higherDate"
                    control={control}
                    border={false}
                    placeholderText="Data final"
                  />
                  <Input
                    alignSelf="right"
                    placeholder="Pesquisa"
                    minWidth="10vw"
                    errors={errors.search}
                    {...register('search')}
                    rightElement={<BiSearch />}
                  />
                </Flex>
              </form>
              {filter !== '' ? (
                <Flex w="100%" alignItems="center" justifyContent="start">
                  <Button
                    variant="unstyled"
                    fontSize="14px"
                    leftIcon={<CloseIcon mr="0.5rem" boxSize="0.6rem" />}
                    onClick={cleanFilters}
                  >
                    Limpar filtros aplicados
                  </Button>
                </Flex>
              ) : null}
              <Flex flexDirection="column" width="100%">
                <TableContainer
                  borderRadius="15px 15px 0 0 "
                  height="55vh"
                  whiteSpace="inherit"
                  fontSize="sm"
                  border="1px"
                  borderColor={theme.colors.primary}
                  overflowY="auto"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '6px',
                      background: '#C6C6C6',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#F49320',
                      borderRadius: '24px',
                    },
                  }}
                >
                  <Table variant="striped" colorScheme="orange" width="100%">
                    <Thead
                      bg={theme.colors.primary}
                      fontWeight="semibold"
                      order={theme.colors.primary}
                      position="sticky"
                      top="0"
                      zIndex={+1}
                    >
                      <Tr width="100%" color={theme.colors.white}>
                        <Td>Tipo - ID</Td>
                        <Td>Gerado por</Td>
                        <Td>Data</Td>
                        <Td />
                      </Tr>
                    </Thead>
                    <Tbody fontWeight="semibold" maxHeight="200px">
                      {reports.map((report) => (
                        <Tr
                          onClick={(event) => {
                            handleView(report);
                            event.stopPropagation();
                          }}
                          key={report.id}
                          cursor="pointer"
                        >
                          <Td fontWeight="medium">
                            {/* {report.type} */}
                            EXEMPLO
                            <Td p={0} fontWeight="semibold">
                              {/* {report.id} */}
                              exemplo
                            </Td>
                          </Td>
                          <Td>
                            {/* {report.generatedBy} - {report.role} */}Pupak
                          </Td>
                          <Td>{/* { {report.date} } */}21/11/2023</Td>
                          <Td>
                            <AiFillFilePdf size="1.7rem" />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex justifyContent="center" mt="15px">
                  {currentPage > 1 && (
                    <Button
                      variant="link"
                      color="#00000"
                      p={2}
                      leftIcon={<ArrowLeftIcon />}
                      _hover={{ cursor: 'pointer', color: 'orange.500' }}
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        setOffset(offset - limit);
                      }}
                    >
                      Anterior
                    </Button>
                  )}
                  {nextReports.length > 0 && (
                    <Button
                      variant="link"
                      color="#00000"
                      p={2}
                      rightIcon={<ArrowRightIcon />}
                      _hover={{ cursor: 'pointer', color: 'orange.500' }}
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        setOffset(offset + limit);
                      }}
                    >
                      Próximo
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <ReportRegisterModal
          onClose={onClose}
          isOpen={isOpen}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
        <ReportViewModal
          onClose={onViewClose}
          selectedReport={selectedReport}
          isOpen={isViewOpen}
        />
      </GridItem>
    </Grid>
  );
}
export { ReportsTable };
