import { Form, Input, Modal, Select, Table, DatePicker } from "antd";
import React, { useEffect, useState, message } from "react";
import { useNavigate } from "react-router-dom";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddEditTransaction from "../components/AddEditTransaction";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import Spinner from "../components/Spinner";
import axios from "axios";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;
function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  // const navigate = useNavigate();
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("expense-tracker-user"));
      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      console.log(response.data);
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something Went Wrong");
    }
  };
  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      // message.success("Transaction Deleted Successfully");
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted Successfully");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Referance",
      dataIndex: "referance",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined onClick={() => deleteTransaction(record)} />
          </div>
        );
      },
    },
  ];
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7"> Last One Week</Select.Option>
              <Select.Option value="30"> Last One Month</Select.Option>
              <Select.Option value="365"> Last One Year</Select.Option>
              <Select.Option value="custom"> Custom Range</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="income"> Income</Select.Option>
              <Select.Option value="expense"> Expense</Select.Option>
              <Select.Option value="all"> All</Select.Option>
            </Select>
          </div>
        </div>

        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={`mx-3${
                  viewType === "table"
                }? "active-icon" : "inactive-icon" }`}
                onClick={() => setViewType("table")}
                size={30}
              />
              <AreaChartOutlined
                className={`${
                  viewType === "analytics"
                }? "active-icon" : "inactive-icon" }`}
                onClick={() => setViewType("analytics")}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => {
              setShowAddEditTransactionModal(true);
            }}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analytics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData} />
          </div>
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>
      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectetdItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}
export default Home;
