package JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;

public class JDBC_EX3 {
    private static final String username = "postgres";
    private static final String password = "1111";
    private static final String dbUrl = "jdbc:postgresql://localhost:5432/TestDB1410";

    public static void main(String[] args) throws ClassNotFoundException {
        Class.forName("org.postgresql.Driver");

        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Enter the author:");
            String author = scanner.nextLine();

            System.out.println("Select the option:\n" +
                    "1 - Which of the poems has the most exclamation points?\n" +
                    "2 - Which of the poems has the least narrative sentences?\n" +
                    "3 - Are there sonnets among the poems and how many of them?");
            String option = scanner.nextLine();

            switch (option) {
                case "1":
                    System.out.println(findMostExclamatoryPoem(author));
                    break;
                case "2":
                    System.out.println(findLeastNarrativePoem(author));
                    break;
                case "3":
                    System.out.println(countSonnets(author));
                    break;
                default:
                    System.out.println("Invalid option");
            }
        }
    }

    public static String findMostExclamatoryPoem(String author) {
        String mostExclamatoryPoem = null;

        try (Connection connection = DriverManager.getConnection(dbUrl, username, password)) {
            String sql = "SELECT poem FROM poems WHERE author = ? ORDER BY LENGTH(poem) - LENGTH(REPLACE(poem, '!', '')) DESC LIMIT 1";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, author);
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        mostExclamatoryPoem = resultSet.getString("poem");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return mostExclamatoryPoem;
    }

    public static String findLeastNarrativePoem(String author) {
        String leastNarrativePoem = null;

        try (Connection connection = DriverManager.getConnection(dbUrl, username, password)) {
            String sql = "SELECT poem FROM poems WHERE author = ? ORDER BY LENGTH(poem) - LENGTH(REPLACE(poem, '.', '')) ASC LIMIT 1";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, author);
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        leastNarrativePoem = resultSet.getString("poem");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return leastNarrativePoem;
    }

    public static int countSonnets(String author) {
        int sonnetCount = 0;

        try (Connection connection = DriverManager.getConnection(dbUrl, username, password)) {
            String sql = "SELECT COUNT(*) AS sonnet_count FROM poems WHERE poem LIKE 'Л%' AND author = ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, author);
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        sonnetCount = resultSet.getInt("sonnet_count");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return sonnetCount;
    }
}
